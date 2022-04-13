export const compareLocations = (latitudeOne: number, longitudeOne:number, latitudeTwo:number, longitudeTwo: number) => {
    const R = 6371e3;
    const φ1 = latitudeOne * Math.PI/180;
    const φ2 = latitudeTwo * Math.PI/180;
    const Δφ = (latitudeTwo-latitudeOne) * Math.PI/180;
    const Δλ = (longitudeTwo-longitudeOne) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    const d = R * c;
    return (d);
}