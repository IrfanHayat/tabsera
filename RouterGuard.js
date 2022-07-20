import { useState, useEffect } from "react";
import { useRouter } from "next/router";
//import { userService } from 'services';
import { useSelector, useDispatch } from "react-redux";
export { RouteGuard };
import localStorage from "localStorage";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import AlertTitle from "@mui/material/AlertTitle";
import Dialog from "@mui/material/Dialog";

function RouteGuard({ children }) {
  const router = useRouter();

  //const {name}=useSelector(state=>state.auth)
  const [open, setOpen] = useState(false);
  const [authorized, setAuthorized] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  useEffect(() => {
    // on initial load - run auth check
    authCheck(router.asPath);

    // on route change start - hide page content by setting authorized to false
    const hideContent = () => setAuthorized(false);
    router.events.on("routeChangeStart", hideContent);

    // on route change complete - run auth check
    router.events.on("routeChangeComplete", authCheck);

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off("routeChangeStart", hideContent);
      router.events.off("routeChangeComplete", authCheck);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function authCheck(url) {
    // redirect to login page if accessing a private page and not logged in

    const publicPaths = ["/login"];

    const path = url.split("?")[0];
    const name = localStorage.getItem("name");

    if (!name && !publicPaths.includes(path)) {
      setAuthorized(false);
      // console.log("Not Sign IN");
      // alert("please login");
      // <Dialog open={open}>
      //   <Stack sx={{ width: "100%" }} spacing={2}>
      //     <AlertTitle>Warning</AlertTitle>
      <Alert severity="warning">
        Session Expired — <strong> Please Login Again</strong>
      </Alert>;
      {
        /* </Stack>
      </Dialog>; */
      }
      router.push({
        pathname: "/login",
        query: { returnUrl: router.asPath },
      });
    } else {
      setAuthorized(true);
    }
  }

  return authorized && children;
}
