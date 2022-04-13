export interface Filter {
    agegap: [number, number],
    proximity: number,
    popularity: [number, number],
    interests: (string)[]
}