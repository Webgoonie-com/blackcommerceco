export { default } from "next-auth/middleware";

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: [
        "/mybusinesses",
        "/myprofile",
        "/myproperties",
        "/pendingstays",
        "/propertybookings",
        "/reservations",
        "/baps",
        "/myfavorites",
  ],
};