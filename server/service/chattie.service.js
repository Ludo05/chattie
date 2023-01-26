import { chattieRepository } from '../repositories/chattie.repository.js'
import * as dotenv from "dotenv";
import {Configuration, OpenAIApi} from "openai";

dotenv.config()

class ChattieService {




    constructor() {
        const configuration = new Configuration({
            organization: "org-bIpHT1mYyy7QJRzHMVzTrgd6",
            apiKey: process.env.OPEN_API_KEY,
        })

         this.openai = new OpenAIApi(configuration);

    }
    async findAll() {
        const data = await chattieRepository.findAll();
        if (data) {
            return data.Items;
        }

        return data;
    }

    async deleteAll() {
        const data = await chattieRepository.deleteAll();
        return data;
    }
    async create(data) {
      try {
         const user = await chattieRepository.create({
              user: 'me',
              message: data.message
          });

          const response = await this.openai.createCompletion({
              model: 'text-davinci-003',
              prompt: `${data.message}`,
              temperature: 0,
              max_tokens: 3_000,
              top_p: 1,
              frequency_penalty: 0.5,
              presence_penalty: 0
          })

         const gpt = await chattieRepository.create({
              user: 'gpt',
              message: response.data.choices[0].text
          });

          return {
              gpt,
              user
          }


      } catch (e) {
          console.log(e)
      }
    }
}

const chattieService = new ChattieService()

export {
    chattieService
}
