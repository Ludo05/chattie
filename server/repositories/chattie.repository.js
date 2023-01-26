import { db } from '../helpers/index.js'
import { v4 as uuidv4 } from 'uuid';


class ChattieRepository {
    constructor() {
        this.tableName = 'Chattie'

    }

    async findAll() {
        const params = {
            TableName: this.tableName,
        };

        return await db.scan(params).promise();
    }

    async create(data) {
        const params = {
            TableName: this.tableName,
            Item: {
                _id: uuidv4(),
                user: data.user,
                message: data.message,
            },
        };

        await db.put(params).promise();

        return params.Item;
    }

    async deleteAll() {
        const items = await this.findAll()
        if (items) {
                const result = await db.batchWrite(       {
                    RequestItems: {
                        [this.tableName]: items.Items.map(item => {
                            return {
                                DeleteRequest: {
                                    Key: {
                                        _id: item._id
                                    }
                                }
                            };
                        })
                    }
                }).promise();
                return result
        }
    }
}


const chattieRepository = new ChattieRepository()
export {
    chattieRepository
}
