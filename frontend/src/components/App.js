import React, { useEffect, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Header from './Header/Header';
import Main from './Main/Main';
import Footer from './Footer/Footer';
import Login from './Login';
import Register from './popup-components/Register';
import EditAvatarPopup from './popup-components/EditAvatarPopup';
import EditProfilePopup from "./popup-components/EditProfilePopup";
import ImagePopup from './popup-components/ImagePopup';
import ConfirmPopup from './popup-components/ConfirmPopup';
import AddPlacePopup from './popup-components/AddPlacePopup';
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from '../utils/Api';
import { register, authorize, getContent } from "../utils/auth";
import InfoToolTip from './InfoToolTip';

function App() {
	const [currentUser, setCurrentUser] = useState({});
	
	const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
	const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
	const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
	const [isImagePopupOpen, setImagePopupOpen] = useState(false);
	const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
	const [isRegisterFormOpen, setIsRegistgerFormOpen] = useState(false);

	const [cards, setCards] = useState([]);
	const [slectedCard, setSelectedCard] = useState(null);
	const [cardDelete, setCardDelete] = useState(null);

	const [changeAvaButtonName, setChangeAvaButtonName] = useState('Сохранить');
	const [changeProfileEditButtonName, setChangeProfileEditButtonName] = useState('Сохранить');
	const [changeAddPlaceButtonName, setChangeAddPlaceButtonName] = useState('Создать');
	const [changeDelButtonName, setChangeDelButtonName] = useState('Да');
	const [changeAuthBtnName, setChangeAuthBtnName] = useState('Сохранить');
	const [changeLoginBtnName, setChangeLoginBtnName] = useState('Войти ');
	const [errorMessage, setErrorMessage] = useState({});
	
	const [loggedIn, setLoggedIn] = useState(false);
	const [email, setEmail] = useState('');
	const [isSignup, setIsSignup] = useState(false);
	const [signupError, setSignupError] = useState('');

	const history = useHistory();
	
//

	useEffect(() => {
		Promise.all([api.getProfile(), api.getInitialCards()])
			.then(([userData, cards]) => {
				// const [userData, cards] = res;
				setCurrentUser(userData);
				setCards(cards);
			})
			.catch((err) => console.log(err));
	}, [loggedIn]);

	
	useEffect(() => checkToken(), [loggedIn])
// ava

	function handleEditAvatarClick() {
		setIsEditAvatarPopupOpen(true);
	};

	function handleEditAvatar(avatar) {
		setChangeAvaButtonName('Сохраняю...');
		api.editAvatar(avatar)
			.then(user => {
				setCurrentUser(user);
				closeAllPopups();
			})
			.catch((err) => console.log(err))
			.finally(() => {
				setChangeAvaButtonName('Сохранить')
			});
	}

// profile

	function handleEditProfileClick() {
		setIsEditProfilePopupOpen(true);
	};

	function handleEditUser(userData) {
		setChangeProfileEditButtonName('Сохраняю...');
		api.editProfile(userData)
			.then(userData => {
				setCurrentUser(userData);
				closeAllPopups();
			})
			.catch((err) => console.log(err))
			.finally(() => {
				setChangeProfileEditButtonName('Сохранить')
			});
	}

// add place

	function handleAddPlaceClick() {
		setIsAddPlacePopupOpen(true);
	};

	function handleAddPlace(card) {
		setChangeAddPlaceButtonName('Создание...');
		api.postCard(card)
			.then(newCard => {
				setCards([newCard, ...cards]);
				closeAllPopups();
			})
			.catch((err) => console.log(err))
			.finally(() => {
				setChangeAddPlaceButtonName('Создать')
			});			
	}

	function handleConfirmDelete(card) {
		setIsConfirmPopupOpen(true);
		setCardDelete(card);
	}

	function closeAllPopups() {
		setIsEditProfilePopupOpen(false);
		setIsAddPlacePopupOpen(false);
		setIsEditAvatarPopupOpen(false);
		setIsConfirmPopupOpen(false);
		setImagePopupOpen(false);
		setIsRegistgerFormOpen(false);
		setSelectedCard(null);
		setErrorMessage({});
	};

	function handleCardClick(card) {
		setSelectedCard(card);
		setImagePopupOpen(true);
	};

	function handleCardDelete() {
		setChangeDelButtonName('Удаление...');
		api.deleteCard(cardDelete._id)
			.then(() => {
				setCards((state) => state.filter((c) => c._id !== cardDelete._id));
				closeAllPopups();
			})
			.catch((err) => console.log(err))
			.finally(() => {
				setChangeDelButtonName('Да')
			});
	}

	function handleCardLike(card) {
        const isLiked = card.likes.some(like => like === currentUser._id);
        
        api
			.changeLikeCardStatus(card._id, !isLiked)
			.then((newCard) => {
            	setCards((state) => state.map(c => c._id === card._id ? newCard : c));
        	})
			.catch((err) => console.log(err));
    }

// register & login

	function handleRegister(email, password) {
		setChangeAuthBtnName('Сохраняю...');
		return register(email, password)
			.then((res) => {
				if(res) {
					setIsSignup(true);
					setIsRegistgerFormOpen(true);
					setTimeout(() => {
						setIsRegistgerFormOpen(false);
					}, 2000);
					history.push('/sign-in');
				} else {
					setIsSignup(false);
					setIsRegistgerFormOpen(true);
				}
			})
			.catch((err) => {
				setSignupError(err.message);
				setIsSignup(false);
				setIsRegistgerFormOpen(true);
			})
			.finally(() => {
				setChangeAuthBtnName('Сохраняю...');
			});
	}

	
	
	// useEffect(() => {
	// 	if (loggedIn) {
	// 		history.push('/');
	// 	}
	// }, [loggedIn, history]);

	function checkToken() {
		if (localStorage.getItem('jwt')) {
			const token = localStorage.getItem('jwt')
			getContent(token)
				.then((res) => {
					if (res) {
						setLoggedIn(true);
						setEmail(res.data.email);
					}
				})
				.then((res) => {
					history.push('/');
				})
				.catch((err) => console.log(err));
		}
	}

	// function checkToken() {
	// 	const jwt = localStorage.getItem('jwt');
	// 	if (jwt) {
	// 		getContent(jwt)
	// 			.then((res) => {
	// 				if (res.data?.email) {
	// 					setLoggedIn(true);
	// 					history.push('/');
	// 					setEmail(res.data.email);
	// 				}
	// 			})
	// 			.catch((err) => console.log(err));
	// 	}
	// }

	function handleLogin(email, password) {
		setChangeLoginBtnName('Вход...');
		return authorize(email, password)
			.then((res) => {
				if(res.token) {
					localStorage.setItem('jwt', res.token);
					checkToken();
					// setEmail(res.email);
					setLoggedIn(true);
					history.push('/');
				} else {
					setIsRegistgerFormOpen(true);
				}
			})
			.catch(err => {
				console.log(err.message);
				setSignupError('Некорректный email или пароль');
				setIsSignup(false);
				setIsRegistgerFormOpen(true);
			})
			.finally(() => setChangeLoginBtnName('Вход...'));
	}

	function handleSignOut() {
		localStorage.removeItem('jwt');
		setEmail('');
		setLoggedIn(false);
		history.push('/sign-in');
	}

// validity 

	function checkInputValidity(e) {
		if(!e.currentTarget.checkValidity()) {
			setErrorMessage({...errorMessage, [e.target.name]: e.target.validationMessage});
		} else setErrorMessage({});
	}

	function resetValidation() {
		setErrorMessage({});
	}

// close by esc

	useEffect(() => {
		function closeByEsc(evt) {
			if (evt.key === 'Escape') {
				evt.preventDefault();
				closeAllPopups();
			}
		}
		document.addEventListener('keydown', closeByEsc);
		return () => document.removeEventListener('keydown', closeByEsc)
	}, []);

	return (
		<CurrentUserContext.Provider value={currentUser}>
			<div className="page">
				<Header 
					loggedIn={loggedIn}
					email={email}
					onSignOut={handleSignOut}
					resetValidation={resetValidation}
				/>

				<Switch>
					<ProtectedRoute exact path="/" loggedIn={loggedIn}>
						<Main
							cards={cards}
							onEditAvatar={handleEditAvatarClick}
							onEditProfile={handleEditProfileClick}
							onAddPlace={handleAddPlaceClick}
							onCardClick={handleCardClick}
							onCardLike={handleCardLike}
							onCardDelete={handleConfirmDelete}
						/>
					</ProtectedRoute>

					<Route path="/sign-up">
						
						<Register 
							title="Регистрация"
							onRegister={handleRegister}
							buttonText={changeAuthBtnName}
							errorMessage={errorMessage}
							isValid={checkInputValidity}
							resetValidation={resetValidation}
						/>
					
					</Route>

					<Route path="/sign-in">
						<Login 
							title="Вход"
							onLogin={handleLogin}
							buttonText={changeLoginBtnName}
							errorMessage={errorMessage}
							isValid={checkInputValidity}
						/>
					</Route>
				</Switch>

				<EditAvatarPopup 
					isOpen={isEditAvatarPopupOpen} 
					onClose={closeAllPopups} 
					onEditAvatar={handleEditAvatar}
					buttonText={changeAvaButtonName}
					loggedIn={loggedIn}
					errorMessage={errorMessage}
					isValid={checkInputValidity}
				/>

				<EditProfilePopup 
					isOpen={isEditProfilePopupOpen} 
					onClose={closeAllPopups} 
					onEditUser={handleEditUser}
					buttonText={changeProfileEditButtonName}
					errorMessage={errorMessage}
					isValid={checkInputValidity}
				/>

				<AddPlacePopup 
					isOpen={isAddPlacePopupOpen} 
					onClose={closeAllPopups} 
					onAddPlace={handleAddPlace}
					buttonText={changeAddPlaceButtonName}
					loggedIn={loggedIn}
					errorMessage={errorMessage}
					isValid={checkInputValidity}
				/>

				<ConfirmPopup 
					isOpen={isConfirmPopupOpen} 
					onClose={closeAllPopups} 
					onCardDelete={handleCardDelete}
					buttonText={changeDelButtonName}
				/>

				<ImagePopup 
					card={slectedCard} 
					isOpen={isImagePopupOpen} 
					onClose={closeAllPopups} 
				/>

				{isRegisterFormOpen &&
					<InfoToolTip 
						signupError={signupError}
						isSignup={isSignup}
						isOpen={isRegisterFormOpen}
						onClose={closeAllPopups}
					/>
				}

				<Footer />

			</div>
		</CurrentUserContext.Provider>
	);
}

export default App;
