if (process.env.NODE_ENV === "production") {
  export default from "./prod";
} else {
  export default from "./dev";
}
