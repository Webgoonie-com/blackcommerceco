export interface UploadedFile {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    destination: string;
    filename: string;
    path: string;
    size: number;
}

export const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
    'image/webp': 'webp'
};

export interface MimeTypeMap {
    [key: string]: string;
}

export interface Country {

    value: string;
    label: string;
    currency: string;
    phonecode: number;
    flag: string;
    latlng: number[] | number | [] | string | null;
    latitude:  number;
    longitude: number;
    region: string;
    isoCode: 'GH',
    name: 'Ghana',
    timezones: []

}



