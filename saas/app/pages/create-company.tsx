import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Input,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useRef, useState } from 'react';
function CreateCompany() {
  const [file, setFile] = useState<any>(null);
  const newAvatarUrl =
    'https://storage.googleapis.com/async-await/default-user.png?v=1';
  const inputRef: React.Ref<any> = useRef(null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files[0]);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const companyName = inputRef.current.value;
    console.log('formdata', e);
    console.log('inputref', companyName);
    const fd = new FormData();
    fd.append('company', companyName);
    fd.append('companyLogo', file);
  };
  return (
    <>
      <Container maxWidth="sm">
        <form
          encType="multipart/form-data"
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            handleSubmit(e);
          }}>
          <Box marginTop={5}>
            <Typography variant="subtitle1">Create Company</Typography>
            <TextField
              margin="dense"
              fullWidth
              id="createCompany"
              label="Type Your team's name."
              variant="standard"
              helperText="Company name as seen by your team members."
              inputRef={inputRef}
            />
          </Box>
          <Box marginTop={5}>
            <Typography variant="subtitle1">Company Logo (optional)</Typography>
            <Box marginTop={2} marginBottom={5}>
              <Grid container spacing={2}>
                <Grid item>
                  <Avatar alt="company-logo" src={newAvatarUrl} />
                </Grid>
                <Grid item>
                  <label htmlFor="btn-upload">
                    <Button
                      color="primary"
                      variant="contained"
                      component="span">
                      <input
                        id="btn-upload"
                        name="btn-upload"
                        onChange={(e) => handleChange(e)}
                        style={{ display: 'none' }}
                        type="file"
                      />
                      Select company logo
                    </Button>
                  </label>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Button type="submit" color="primary" variant="contained">
            Create new company
          </Button>
        </form>
      </Container>
    </>
  );
}
export default CreateCompany;
