import { randomUUID } from "crypto"

export class DatabaseMemory {
    #videos = new Map()

    list(search){
        return Array.from(this.#videos.entries()).map((videoArray)=> {
            const id = videoArray[0]
            const data = videoArray[1]

            return {
                id,
                ...data,
            }
        })

        .filter(video => {
            if(search){
                return video.title.includes(search)
            }

            return true
        })
    }

    create(video){
        // gerar id aleatório para vídeo
        const videoId = randomUUID()
        // UUID - Universal Unique ID


        this.#videos.set(videoId, video)
    }

    update(id, video){
        this.#videos.set(id, video)
    }

    delete(id){
        this.#videos.delete(id)
    }
}