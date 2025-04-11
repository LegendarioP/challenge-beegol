import { Drawer, Toolbar, Box, List, ListItem, ListItemText } from "@mui/material";

export default function SideMenu() {
  return (
    <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            <ListItem component="a" href="/">
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem component="a" href="/chart">
              <ListItemText primary="Gráfico" />
            </ListItem>
          </List>
        </Box>
    </Drawer>
  )
}