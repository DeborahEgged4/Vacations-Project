import { useNavigate } from "react-router-dom";
import "./SingleVacation.css";
import { Card, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";

interface singleVacationProps {
    vacationId: number;
    destination: string;
    description:string;
    startDate:Date;
    endDate: Date;
    price:number;
    //image:string;
}

const formatDate = (date: Date): string => {
  const formattedDate = new Date(date).toLocaleDateString();
  const [month, day, year] = formattedDate.split("/");
  return `${day}/${month}/${year}`;
};

function singleVacationProps(props: singleVacationProps): JSX.Element {
    return (
      <div className="SingleVacation">
        <Card
          raised
          sx={{ width: "90%", height: 500, mb: 2, borderRadius: "5%" }}
        >
          <div className="cardHeader">
            <CardHeader
              title={
                <div className="headerTitle">
                  {props.destination}{" "}
                    vacationId={props.vacationId}
                </div>
              }
              subheader={`${formatDate(props.startDate)} - ${formatDate(
                props.endDate
              )}`}
            />
              className="price"
              label={"$" + props.price}
              color="secondary"
          </div>
          <CardContent sx={{ overflow: "auto", height: 100 }}>
            <Typography className="description" color="text.secondary">
              {props.description}
            </Typography>
          </CardContent>
        </Card>
      </div>
    );
  }
  

export default singleVacationProps;
