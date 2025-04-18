import { AppBar, Toolbar, Typography } from "@mui/material";

interface TopBarProps {
    title: string;
  }
  
export default function TopBar({ title }: TopBarProps) {
    return (
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
                <Typography variant="h6" noWrap component="div">
                    {title}
                </Typography>
            </Toolbar>
        </AppBar>
    )
}