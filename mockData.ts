export const MOCK_DATA = true; // change to false to use real data from actual SQL database

interface IVacation {
    vacationId: number;
    destination: string;
    description: string;
    startDate: Date;
    endDate: Date;
    price: number;
    image: string;
}

interface iUser {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    isAdmin: boolean;
}

const cities = [
    "Rome", "Paris", "Berlin", "Madrid", "London",
    "Dublin", "Vienna", "Lisbon", "Prague", "Athens",
    "Budapest", "Brussels"
];

export const mockVacations: IVacation[] = cities.map((city, i) => ({
    vacationId: i + 1,
    destination: city,
    description: `Experience the wonderful city of ${city}!`,
    startDate: new Date(`2023-08-${(i % 28) + 1}`),
    endDate: new Date(`2023-08-${((i + 7) % 28) + 1}`),
    price: (i + 1) * 200,
    image: 'https://i.guim.co.uk/img/media/b3585cf7b5525c4f27b924754ed98b3b7fbdaf53/0_383_8048_4831/master/8048.jpg?width=1200&quality=85&auto=format&fit=max&s=7c79a7b8220f2d5aca237616cac7abda'
}));


export const mockUsers: iUser[] = [
    {
        userId: 1,
        firstName: "Alice",
        lastName: "Smith",
        email: "alice.smith@example.com",
        password: "password1",
        isAdmin: true, // Alice is an admin
    },
    {
        userId: 2,
        firstName: "Bob",
        lastName: "Johnson",
        email: "bob.johnson@example.com",
        password: "password2",
        isAdmin: false,
    },
    {
        userId: 3,
        firstName: "Charlie",
        lastName: "Brown",
        email: "charlie.brown@example.com",
        password: "password3",
        isAdmin: false,
    },
];


interface userVacationFollows {
    userId: number;
    vacationId: number;
}

export const mockUserVacationFollows: userVacationFollows[] = [
    {
        userId: 1,
        vacationId: 1,
    },
    {
        userId: 2,
        vacationId: 2,
    }
];


/*const mockVacations: IVacation[] = [
    {
        vacationId: 1,
        destination: "London",
        description: "London is the capital and largest city of England and the United Kingdom.",
        image: "https://assets.editorial.aetnd.com/uploads/2019/03/topic-london-gettyimages-760251843-feature.jpg",
        startDate: new Date("2021-10-01"),
        endDate: new Date("2021-10-10"),
        price: 1000,
    },
    {
        vacationId: 2,
        destination: "Paris",
        description: "Paris is the capital and most populous city of France.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg/1200px-La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg",
        startDate: new Date("2021-10-01"),
        endDate: new Date("2021-10-10"),
        price: 1000,

    },
    {
        vacationId: 3,
        destination: "New York",
        description: "New York City comprises 5 boroughs sitting where the Hudson River meets the Atlantic Ocean.",
        image: "https://i.guim.co.uk/img/media/b3585cf7b5525c4f27b924754ed98b3b7fbdaf53/0_383_8048_4831/master/8048.jpg?width=1200&quality=85&auto=format&fit=max&s=7c79a7b8220f2d5aca237616cac7abda",
        startDate: new Date("2021-10-01"),
        endDate: new Date("2021-10-10"),
        price: 1000,
    }
]*/