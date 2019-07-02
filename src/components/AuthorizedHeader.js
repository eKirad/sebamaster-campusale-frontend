import React from 'react';


export function AuthorizedHeader() {



    return (
        <div className={classes.root} >
          <AppBar position="static" className = {classes.toolbar}>
            <Toolbar className = { classes.toolbar }>
              <IconButton 
                edge="start" 
                className={ menuButtonHover ? classes.menuButtonHovered : classes.menuButton } 
                color="inherit" 
                aria-label="Menu"
                onMouseOver = { toggleMenuButtonHover }
                onMouseLeave = { toggleMenuButtonHover }
                >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                CampuSale
              </Typography>
              <span>
              <IconButton 
                className = { loginButtonHover ? classes.headerButtonHovered : classes.headerButton }
                onMouseOver = { toggleLoginButtonHover }
                onMouseLeave = { toggleLoginButtonHover }
                component={Link} 
                to= {`/login`}>
                  <UserIcon/>
              </IconButton>
              </span>
              
            </Toolbar>
          </AppBar>
        </div>
      );
}