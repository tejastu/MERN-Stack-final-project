export const Header = () => {
   let user = JSON.parse(localStorage.getItem("currentuser"));
   if (user.data && user.data.token) {
      return { "x-auth-token": user.data.token };
   } else {
      return {};
   }
};
