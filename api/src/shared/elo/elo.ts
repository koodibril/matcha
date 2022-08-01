export const calculateElo = (elo1: number, elo2: number, rel1: any, rel2: any) => {
    const K = 32;
    const rating1 = Math.pow(10, (elo1/400));
    const rating2 = Math.pow(10, (elo2/400));
    const expected1 = rating1 / (rating1 + rating2);
    const expected2 = rating2 / (rating1 + rating2);
    let score1 = 0;
    let score2 = 0;
    if (rel1.Like === true && rel2.Like === false) {
        score1 = 0;
        score2 = 1;
    } else if (rel1.Like === false && rel2.Like === true) {
        score1 = 1;
        score2 = 0;
    } else if ((rel1.Like === false && rel2.Like === false) ||
        (rel1.like === true && rel2.like === true)) {
            score1 = 0.5;
            score2 = 0.5;
    }
    const newElo1 = Math.round(elo1 + K * (score1 - expected1));
    const newElo2 = Math.round(elo2 + K * (score2 - expected2));

    const result = {
        elo1: newElo1 < 0 ? 0 : (newElo1 > 2000 ? 2000 : newElo1),
        elo2: newElo2 < 0 ? 0 : (newElo2 > 2000 ? 2000 : newElo2)
    };
    return result;
}