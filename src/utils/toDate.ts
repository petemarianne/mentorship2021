export const toDate = (date: {seconds: number, nanoseconds: number}): Date => {
    return new Date(date.seconds * 1000);
};
