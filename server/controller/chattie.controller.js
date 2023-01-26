import { chattieService } from "../service/chattie.service.js";

class ChattieController {

    constructor() {
    }

    home(req, res) {
        return res.json({ home: 'welcome to chattie'})
    }
    async findAll(req, res) {
        const data = await chattieService.findAll()

        return res.json(data)
    }

    async deleteAll(req, res) {
        const data = await chattieService.deleteAll()
        return res.json({success: data})
    }

    async create(req, res) {
        const data = await chattieService.create(req.body)

        return res.json(data)
    }

}

const chattieController = new ChattieController();

export  {
    chattieController
}
