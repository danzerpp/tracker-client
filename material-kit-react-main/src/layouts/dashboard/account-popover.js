import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { Box, Divider, MenuItem, MenuList, Popover, Typography } from '@mui/material';
import { useAuth } from 'src/hooks/use-auth';
import { useTranslation }  from "react-i18next";

export const AccountPopover = (props) => {
  const { anchorEl, onClose, open } = props;
  const router = useRouter();
  const auth = useAuth();
  const{t} = useTranslation();
  const handleSignOut = useCallback(
    () => {
      onClose?.();
      auth.signOut();
      router.push('/auth/login');
    },
    [onClose, auth, router]
  );
  var user = {};

    const handleChangePassword = async () =>
    {

      try  
{
   user = JSON.parse(window.localStorage.getItem('authenticated_user'));
   router.push({
    pathname: '/forms/user/changePassword',
    query: { userId: user.id,
            userEmail: user.email
    }
}, '/forms/user/add')
}
catch (err) 
{

}

     
    }

try  
{
   user = JSON.parse(window.localStorage.getItem('authenticated_user'));

}
catch (err) 
{

}

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'bottom'
      }}
      onClose={onClose}
      open={open}
      PaperProps={{ sx: { width: 200 } }}
    >
      <Box
        sx={{
          py: 1.5,
          px: 2
        }}
      >
        <Typography variant="overline">
          {t("account")}
        </Typography>
        <Typography
          color="text.secondary"
          variant="body2"
        >
          {user.email}
        </Typography>
      </Box>
      <Divider />
      <MenuList
        disablePadding
        dense
        sx={{
          p: '8px',
          '& > *': {
            borderRadius: 1
          }
        }}
      >
         <MenuItem onClick={handleChangePassword}>
          {t("change-password")}
        </MenuItem>
        <MenuItem onClick={handleSignOut}>
        {t("logout")}
        </MenuItem>
    
      </MenuList>
    </Popover>
  );
};

AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired
};
