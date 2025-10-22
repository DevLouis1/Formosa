import { JSX } from 'react/jsx-runtime';
import './LoadingScreen.css';

export default function LoadingScreen(): JSX.Element {
  return (
    <div className='loading-screen'>
      <div className='spinner'>
        <div className='spinner-ring'></div>
        <div className='spinner-ring'></div>
        <div className='spinner-ring'></div>
      </div>
    </div>
  );
}
