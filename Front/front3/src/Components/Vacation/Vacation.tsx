import React from "react";

interface IVacationProps {
    index: number;
    destination: string;
    description: string;
    startDate: string | Date;
    endDate: string | Date;
    image: string;
    price: number;
    isFollowed?: boolean;
    isAdmin?: boolean;
}

const Vacation = (props: IVacationProps) => {
    const { index, destination, description, startDate, endDate, image, price } = props;
    return (
        <div
            key={index}
            style={{
                border: "1px solid black",
                borderRadius: "10px",
                width: "200px",
                backgroundColor: "rgba(169,169,169,0.57)",
            }}
        >
            <div>
                {props.isAdmin ?
                    <div>
                        <button>edit</button>
                        <button>delete</button>
                    </div>
                    :
                    <input
                        type="checkbox"
                        checked={props.isFollowed}
                    />
                }
            </div>
            <h3>Destination:{destination}</h3>
            <img src={image} width={"150px"} alt={destination} />
            <p>Description{description}</p>
            <p>Price:{price}</p>
            <p>Start Date: {new Date(startDate).toLocaleDateString()}</p>
            <p>End Date: {new Date(endDate).toLocaleDateString()}</p>
        </div>
    )
}

export default Vacation;