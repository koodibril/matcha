const generateParams = (params: (string)[]) => params.map(p => `${toUpper(p)}: $${p.toLowerCase()}`);
const toUpper = (str: string) => `${str.charAt(0).toUpperCase()}${str.slice(1).toLowerCase()}`;


export const generateQuery = (action: string[], models: string[], params: string[], updates: string[], getCount: boolean) => {
    let querie = '';
    querie = querie + action[0].toUpperCase(); //querie will always begin by match, but for better understanding we still need to ask for a match
    if (models.length === 2) {
        querie = querie + models[0] + models[1]
    }
}