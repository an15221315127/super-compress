
declare global {
    export class ImageCompress {
        dir: string
        min: number
        max: number
        key: string
        mode: string
        constructor(prop: Prop)
    }
}
export interface Prop {
    dir: string
    min: number
    max: number
    key: string
    mode: string
}

