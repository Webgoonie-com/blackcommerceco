import { orm } from "../utils/orm.server";
import { Prisma } from '@prisma/client';

import path from 'path';
import { unlink } from "fs/promises";
import { Country } from "../types";




export const listCountries = async (): Promise<Country | any> => {


    const countries = await orm.country.findMany({
        
    })


    return countries

};