import './userList.scss';
import UserListItem from './UserListItem';
import { getFollowers, getFollowing } from '../../api/users';
import { useQuery } from '@tanstack/react-query';
import Error from '../error/Error';
import Loading from '../loading/Loading';

const UserList = ({ isOpen, onClose, username, type }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["userList"],
    queryFn: async () => type === "Followers" ? await getFollowers(username) : getFollowing(username)
  });

  if (!isOpen) return null;

  return (
    <div className="user-list-modal-overlay">
      <div className="user-list-modal">
        <div className="modal-header">
          <h2>{`${type} `}</h2>
          <button className="close-button" onClick={onClose}>X</button>
        </div>
        <div className="modal-body">
            {error
                ? <Error />
                : isLoading
                ? <Loading />
                : data.map((user, index) => <UserListItem key={index} user={user} />)}
        </div>
      </div>
    </div>
  );
};

export default UserList;