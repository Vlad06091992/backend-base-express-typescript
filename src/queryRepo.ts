export const videoQueryRepo = {
    getVideos(): VideoOutputModel[] {
        const dbVideos: DBVideo[] = []
        const authors: DBAuthor[] = []

        const author: DBAuthor = authors.find(a => a._id === author?._id)!

        return dbVideos.map(dbVideo => this._mapVideoToVideoOutputModel(dbVideo, author))
    },
    getBannedVideos(): BannedVideoOutputModel[] {
        const dbVideos: DBBannedVideo[] = []
        const authors: DBAuthor[] = []

        const author: DBAuthor = authors.find(a => a._id === author?._id)!
        return dbVideos.map(dbVideo => {
            return {
                id: dbVideo._id,
                title: dbVideo.title,
                author: {
                    id: author._id,
                    name: `${author?.firstName}' '${author?.lastName}`
                },
                banReason: dbVideo.banObject.banReason
            }
        })
    },
    getVideoById(id: string): VideoOutputModel {
        const video: DBVideo = {
            _id: '1',
            title: "video title",
            authorId: '13'
        };
        const author: DBAuthor = {
            _id: '1',
            firstName: "Vlad",
            lastName: "Smirnov",
        }

        return this._mapVideoToVideoOutputModel(video, author)
    },
    _mapVideoToVideoOutputModel(video: DBVideo, author: DBAuthor): VideoOutputModel {
        return {
            id: video._id,
            title: video.title,
            author: {
                id: author._id,
                name: `${author?.firstName}' '${author?.lastName}`
            }
        }
    }
}

type DBVideo = {
    _id: string
    title: string
    authorId: string
}

type DBBannedVideo = {
    _id: string
    title: string
    authorId: string
    banObject: {
        isBanned: boolean,
        banReason: string
    }
}

type DBAuthor = {
    _id: string
    firstName: string
    lastName: string
}

type VideoOutputModel = {
    id: string
    title: string
    author: {
        id: string
        name: string
    }
}

type BannedVideoOutputModel = VideoOutputModel & {
    banReason: string
}