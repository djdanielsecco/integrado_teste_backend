import { MongoClient } from 'mongodb';
import { country, MONGODB_URI_DEV } from './constants';

void async function () {
    const client = await MongoClient.connect(
        MONGODB_URI_DEV
    );
    const DATABASE = client?.db('universities')
    // let names:Array<Collection> = await DATABASE!.collections() 
    // 
    for await (const inter of country) {
        const COLLECTION = DATABASE.collection(inter);
        const unique = (arr: any[]) => {
            return arr?.filter(
                (
                    (set) => (f: any) =>
                        !(!set.has(f?.["state-province"]) && set.add(f?.["state-province"])) && (!set.has(f?.name) && set.add(f?.name))
                )(new Set())
            );
        }
        const removeDouble = async (reparse: any[]) => {
            for await (const x of unique(reparse)) {
                // 
                await COLLECTION.findOneAndUpdate({ name: x.name, country: x.country, "state-province": x?.["state-province"] ?? null }, {
                    $set: {
                        name: x?.name,
                        country: x?.country,
                        "state-province": x?.["state-province"] ?? null,
                        alpha_two_code: x?.alpha_two_code,
                        web_pages: x?.web_pages,
                        domains: x?.domains
                    }
                }, { upsert: true });
            }
        }
        const headersList = {
            "Accept": "*/*",
            "User-Agent": 'Mozilla/5.0 (X11; Linux x86_64; rv:100.0) Gecko/20100101 Firefox/100.0'
        }
        const response = await fetch(`http://universities.hipolabs.com/search?country=${inter}`, {
            method: "GET",
            headers: headersList
        });
        const parse = await response.json();
        const exist = await COLLECTION.indexInformation().then(() => true).catch(() => false)
        if (!exist) {
            parse.length > 0 && await COLLECTION.insertMany(unique(parse));
            (parse.length == 0 && !exist) && await DATABASE.createCollection(inter)
        } else {
            if (((await COLLECTION.countDocuments()) != parse.length) && parse.length > 0) {
                await removeDouble(parse)
            }
        }
    }
    await client.close();
}()