import config from '@/config';
import axios from 'axios';
import { Person } from '@/types/Person';

const fetchMe = async () : Promise<Person> => {
  const { data } = await axios.get(`${config.securityUrl}/me`);

  return data;
};

export {
  fetchMe,
};
