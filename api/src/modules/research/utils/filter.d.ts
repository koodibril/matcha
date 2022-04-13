export interface Filter {
    ageGap: [number, number],
    proximity: number,
    popularity: [number, number],
    interests: (string)[]
}