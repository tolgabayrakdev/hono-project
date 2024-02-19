import { Hono } from "hono";

const denemeRouter = new Hono();

denemeRouter.get("/deneme", (c) => {
    return c.text("Deneme");
})

export default denemeRouter;