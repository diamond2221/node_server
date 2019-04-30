import ajax from "./ajax.js";

(async _ => {
    const res = await ajax.post("/testpost", { username: "zhangsan", age: 22 });
    console.log(res);
})();
