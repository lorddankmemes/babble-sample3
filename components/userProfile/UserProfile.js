import React, { useState } from 'react';
import { ethers } from 'ethers';

const UserProfile = () => {

	const [errorMessage, setErrorMessage] = useState(null);
	const [defaultAccount, setDefaultAccount] = useState(null);
	const [userBalance, setUserBalance] = useState(null);
	const [connButtonText, setConnButtonText] = useState('Connect Wallet');

	const connectWalletHandler = () => {
		if (window.ethereum && window.ethereum.isMetaMask) {
			console.log('MetaMask Here!');

			window.ethereum.request({ method: 'eth_requestAccounts' })
				.then(result => {
					accountChangedHandler(result[0]);
					setConnButtonText('Wallet Connected');
					getAccountBalance(result[0]);
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
				setUserBalance(ethers.utils.formatEther(balance));
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
							<button onClick={connectWalletHandler} className="text-white bg-indigo-600 hover:bg-indigo-400 border text-xs font-semibold rounded-full px-4 py-1 leading-normal">{connButtonText}</button>
						</div>
					</div>
				</div>
			</div>
			<div className='mt-4 text-center'>
				<div className='py-3 rounded-lg overflow-visible font-mono'>
					<span lassName="text-lg leading-tight">Address: {defaultAccount}</span>
				</div>
				{errorMessage}
			</div>
		</div>
	);
}

export default UserProfile;