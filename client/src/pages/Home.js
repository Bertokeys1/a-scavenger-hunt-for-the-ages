import {Box} from '@mui/material'

// height: 233,
          // width: 350,
          // maxHeight: { xs: 233, md: 167 },
          // maxWidth: { xs: 350, md: 250 },

const Home = () => {

  return (
    <main>
      <div className="flex-row justify-center">
      <Box
        component="img"
        sx={{
          width: '100%'
          
        }}
        alt="The house from the offer."
        src="/assets/Scavenger-Hunt-Lettering-and-logo.png"
      />
      </div>
    </main>
  );
};

export default Home;
