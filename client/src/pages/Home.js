import {Box} from '@mui/material'

const Home = () => {

  return (
    <main>
      <div className="flex-row justify-center">
      <Box
        component="img"
        sx={{
          width: '100%',
          paddingTop: '20%',
          paddingRight: '8%'
          
        }}
        alt="The house from the offer."
        src="/assets/Scavenger-Hunt-Lettering-and-logo.png"
      />
      </div>
    </main>
  );
};

export default Home;
