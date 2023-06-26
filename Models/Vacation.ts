
class Vacation {
  public vacationId: number;
  public destination: string;
  public description: string;
  public startDate: Date;
  public endDate: Date;
  public price: number;
  public image: string;

  constructor(
    vacationId: number,
    destination: string,
    description: string,
    startDate: Date,
    endDate: Date,
    price: number,
    image: string
  ) {
    this.vacationId = vacationId;
    this.destination = destination;
    this.description = description;
    this.startDate = startDate;
    this.endDate =
      endDate < startDate
        ? (() => {
            throw new Error("End date cannot be earlier than start date.");
          })()
        : endDate;
    this.price = price;
    this.image = image;
  }
}

export default Vacation;
