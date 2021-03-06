import React, { useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import useMatrixOrg from '../../services/useMatrix';
import { User } from '../../providers/user-provider';

const UserProfile = () => {

	const userContext = useContext(User);
	const { mUserLogin } = useMatrixOrg()
	const [errorMessage, setErrorMessage] = useState(null);
	const [defaultAccount, setDefaultAccount] = useState(null);
	const [userBalance, setUserBalance] = useState(null);


	useEffect(() => {
		if (userContext?.state?.public_address != "") {
			mUserLogin({
				userId: userContext?.state?.public_address,
				password: 'Qwerty@12345!@#$%',
			})
		}
	}, [userContext?.state?.public_address])

	const connectWalletHandler = () => {
		if (window.ethereum && window.ethereum.isMetaMask) {
			console.log('MetaMask Here!');

			window.ethereum.request({ method: 'eth_requestAccounts' })
				.then(result => {
					accountChangedHandler(result[0]);
					mUserLogin({
						userId: result[0],
						password: 'Qwerty@12345!@#$%',
					})
					userContext.dispatch({ type: "SET_PUBLIC_ADDRESS", payload: result[0] })
					getAccountBalance(result[0]);
					//login dkt sini
				})
				.catch(error => {
					setErrorMessage(error.message);

				});

		} else {
			console.log('Need to install MetaMask');
			setErrorMessage('Please install MetaMask browser extension to interact');
		}
	}

	// update account, will cause component re-render
	const accountChangedHandler = (newAccount) => {
		setDefaultAccount(newAccount);
		getAccountBalance(newAccount.toString());
	}

	const getAccountBalance = (account) => {
		window.ethereum.request({ method: 'eth_getBalance', params: [account, 'latest'] })
			.then(balance => {
				setUserBalance(ethers.utils.formatEther(balance))
				userContext.dispatch({ type: "SET_AMOUNT", payload: ethers.utils.formatEther(balance) })
			})
			.catch(error => {
				setErrorMessage(error.message);
			});
	};

	return (
		<div className="">
			<div className=" bg-white rounded-lg overflow-hidden">
				<div className="sm:flex sm:items-center">
					<div className='w-[5rem] h-[5rem]'>
						<img className='rounded-full border border-gray-100 max-w-full h-auto' src='/logo.png' alt='metamask logo' />
					</div>
					<div className="mt-4 sm:mt-0 sm:ml-4 text-center sm:text-left">
						<div className="mt-4">
							<button
								onClick={connectWalletHandler}
								className="text-white bg-indigo-600 hover:bg-indigo-400 border text-xs font-semibold rounded-full px-4 py-1 leading-normal">{
									(userContext?.state?.public_address != "") ?
										"Wallet Connected" :
										"Connect Wallet"
								}</button>
						</div>
					</div>
				</div>
			</div>
			<div className='mt-4 text-center'>
				<div className='py-3 rounded-lg overflow-visible font-mono'>
					<span className="text-lg leading-tight">Address: {userContext?.state?.public_address}</span>
				</div>
				{errorMessage}
			</div>
		</div>
	);
}

export default UserProfile;