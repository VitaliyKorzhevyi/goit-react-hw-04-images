import { Oval } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <Oval
      height={180}
      width={180}
      color="#4fa94d"
      wrapperStyle={{ justifyContent: 'center', margin: '70px 0' }}
      wrapperClass=""
      visible={true}
      ariaLabel="oval-loading"
      secondaryColor="#4fa94d"
      strokeWidth={2}
      strokeWidthSecondary={2}
    />
  );
};
