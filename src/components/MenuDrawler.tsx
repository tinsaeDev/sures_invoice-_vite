import {
  Typography,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { ReactElement } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Assessment, Dashboard, Settings } from "@mui/icons-material";

export interface MenuItem {
  title: string;
  url: string;
  icon: ReactElement;
  type?: "group";
  items?: MenuItem[];
}

interface MenuDrawlerProps {
  onClose: () => void;
  open: boolean;
}

function RenderMenu(props: { menu: MenuItem }) {
  const theme = useTheme();

  const menu = props.menu;
  const activeLink = location.pathname == menu.url;

  return (
    <a
      style={{
        textDecoration: "inherit",
        backgroundColor: "inherit",
        color: "inherit",
      }}
      href={menu.url}
    >
      <ListItemButton
        sx={{
          color: activeLink ? theme.palette.action.active : "inherit",
          background: activeLink ? theme.palette.action.selected : "inherit",
        }}
      >
        <ListItemIcon>{menu.icon}</ListItemIcon>
        <ListItemText primary={menu.title} />
      </ListItemButton>
    </a>
  );
}

function hasActiveLink(menu: MenuItem): boolean {
  const items = menu.items;
  if (!items) {
    return false;
  }
  return items.some(function (menu) {
    return menu.url == window.location.pathname;
  });
}

function MenuDrawler(props: MenuDrawlerProps) {
  const menus: MenuItem[] = [
    {
      icon: <Dashboard color="info" />,
      title: "Dashboard",
      url: "/",
    },
    {
      icon: <Assessment color="info" />,
      title: "Reports",
      url: "/reports",
    },
    {
      icon: <Settings color="info" />,
      title: "Settings",
      url: "/settings",
    },
  ];

  return (
    <Drawer
      className="drawer"
      anchor="left"
      open={props.open}
      onClose={props.onClose}
    >
      <Box
        sx={{
          p: 2,
        }}
      >
        {/* Header */}
        <Stack direction="row" alignItems="flex-end" spacing={1}>
          <img
            src={"/logo.png"}
            style={{
              width: "5rem",
            }}
          />
          <Stack>
            <Typography
              variant="subtitle1"
              textTransform={"uppercase"}
              fontWeight={"bold"}
            >
              Sures Invoce
            </Typography>
            <Typography variant="subtitle2" textTransform="uppercase">
              Fast and Secure!
            </Typography>
          </Stack>
        </Stack>

        <Divider
          sx={{
            mt: 2,
          }}
        />

        {/* Body */}
        <Box>
          {" "}
          <List>
            {menus.map((menu, index) => {
              return (
                <React.Fragment key={index}>
                  {menu.type == "group" ? (
                    <Accordion
                      disableGutters={true}
                      defaultExpanded={hasActiveLink(menu)}
                      elevation={0}
                      sx={{
                        border: "none",
                        backgroundColor: "inherit",
                      }}
                    >
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        {menu.icon}
                        <Typography ml={2}> {menu.title} </Typography>
                      </AccordionSummary>
                      <AccordionDetails
                        sx={{
                          pt: 0,
                          pb: 0,
                        }}
                      >
                        {menu.items?.map((menu) => {
                          return <RenderMenu menu={menu} key={menu.url} />;
                        })}
                      </AccordionDetails>
                    </Accordion>
                  ) : (
                    <RenderMenu key={menu.url} menu={menu} />
                  )}
                </React.Fragment>
              );
            })}
          </List>
        </Box>
      </Box>
    </Drawer>
  );
}
export default MenuDrawler;
