import {useEffect, useState} from "react";
import IVacation from "../../../interfaces/Vacation";
import "./VacationsList.css";


const VacationsList = (props: {isAdmin: boolean}) => {
    console.log(`props.isAdmin: ${props.isAdmin}`)
    const [vacations, setVacation] = useState<IVacation[]>([]);

    // useEffect(() => {
    //   const storedVacations = localStorage.getItem("vacations")
    //     ? JSON.parse(localStorage.getItem("vacations"))
    //     : [];
    //   setVacation(storedVacations);
    // }, []);

    const getVacations = async () => {
        try {
            const response = await fetch("http://localhost:8080/vacation/vacations");
            const vacationsResponse = await response.json();
            console.log(vacationsResponse);
            setVacation(vacationsResponse);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getVacations();
    }, [])

    

    return (
        <div className="VacationsList"
             style={{
                 display: "flex",
                 flexDirection: "row",
                 gap: "10px"
             }}
        >

            {vacations.map((item, index) => (
                <div
                    key={index}
                    style={{
                        border: "1px solid black",
                        borderRadius: "10px",
                        width: "200px",
                        backgroundColor: "rgba(169,169,169,0.57)",
                    }}
                >
                    <h3>Destination:{item.destination}</h3>
                    <img src={item.image} width={'150px'} />
                    <p>Description{item.description}</p>
                    <p>Price:{item.price}</p>
                    <p>Start Date:{`${item.startDate}`}</p>
                    <p>End Date:{`${item.endDate}`}</p>
                </div>
            ))}
        </div>
    );
}

export default VacationsList;

