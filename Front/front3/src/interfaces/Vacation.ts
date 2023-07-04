

interface IVacation {
    vacationId: number;
    destination: string;
    description: string;
    startDate: Date | string;
    endDate: Date | string;
    price: number;
    image: string;
    isFollowed?: boolean;
}

export default IVacation;