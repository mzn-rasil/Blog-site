import { createServer, Model, Response } from "miragejs";

createServer({
    models: {
        user: Model,
    },

    routes() {
        this.namespace = "api";
        this.urlPrefix = 'http://localhost:3000';

        this.get("/users", (schema, request) => {
            return schema.users.all();
        });

        this.post("/users/login", (schema, request) => {
            const { email, password } = JSON.parse(request.requestBody);
            const user = schema.users.findBy({ email })?.attrs;
            // const token = jwt.sign({}, "secret")

            if (!user) {
                return new Response(400, {}, { error: "Cannot log in" });
            }

            const isMatch = (user.password === password);

            if (!isMatch) {
                return new Response(400, {}, { error: "Cannot log in " });
            }

            return {
                user,
                token: user.id
            }
        });

        this.post("/users/signup", (schema, request) => {
            const formData = request.requestBody;

            console.log(formData);
        })
    },

    seeds(server) {

    }
})