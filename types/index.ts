interface CommunityUploadInterface {
    data: {
        url: string;
        username: string;
    }[]
    meta: {
        total: number;
    }
}

export {CommunityUploadInterface}