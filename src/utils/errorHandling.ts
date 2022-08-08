const errorHandling = (err: any, column: string) => {
  if (err.errno == "1062") {
    return { status: 409, message: `${column} already exist!` };
  } else {
    return { status: 400, message: err };
  }
};
export default errorHandling;
