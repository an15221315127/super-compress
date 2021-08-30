
declare global {
    export class ImageCompress {
        dir: string
        min: number
        max: number
        constructor(prop: Prop)
    }
}
export interface Prop {
    dir: string
    min: number
    max: number
}

