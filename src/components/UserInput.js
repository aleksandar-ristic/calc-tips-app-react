import { useState } from 'react'
import Error from './Error'

function UserInput({ tipAmount, totalPerPerson }) {
	const [inputTotal, setInputTotal] = useState('')
	const [inputCustom, setInputCustom] = useState('')
	const [inputPeople, setInputPeople] = useState('')

	const checkInput = custom =>
		['5.00001', '10', '15', '25', '50'].filter(radio => radio === custom)

	// tip operations
	const tipCalc = () => (inputTotal / 100) * inputCustom

	const checkValues = () =>
		!inputTotal || !inputCustom || !inputPeople ? true : false
	const checkZero = () =>
		inputTotal <= 0 || inputCustom <= 0 || inputPeople <= 0 ? true : false

	if (checkValues() || checkZero()) {
		tipAmount('$0.00')
		totalPerPerson('$0.00')
	} else {
		const tipFull = parseInt(tipCalc())
		const tipPerPerson = (tipFull / inputPeople).toFixed(2)
		const totalPerPerson = (
			(parseInt(inputTotal) + tipFull) /
			inputPeople
		).toFixed(2)

		tipAmount(`$${tipPerPerson}`)
		totalPerPerson(`$${totalPerPerson}`)
	}

	return (
		<div className='input-container'>
			<div className='w-100'>
				<p>
					Bill{' '}
					<span className={inputTotal === '0' ? 'active' : ''}>
						{inputTotal === '0' ? "Can't be zero." : ''}
					</span>
				</p>
				<div className='input-wrapper'>
					<img src='images/icon-dollar.svg' alt='dollar' />
					<input
						className={`total-input ${inputTotal === '0' ? 'error' : ''}`}
						placeholder='0'
						type='number'
						value={inputTotal}
						onChange={e => setInputTotal(e.target.value)}
					/>
				</div>
			</div>

			<div className='w-100'>
				<p>
					Select Tip % <Error input={inputCustom} />
				</p>
				<div className='grid-container'>
					<label
						htmlFor='5%'
						className={
							inputCustom === '5.00001' || inputCustom === '5' ? 'checked' : ''
						}
					>
						5%
						<input
							type='radio'
							value='5.00001'
							name='tip-percent'
							id='5%'
							onChange={e => setInputCustom(e.target.value)}
							checked={inputCustom === '5.00001' || inputCustom === '5'}
						/>
					</label>
					<label
						htmlFor='10%'
						className={inputCustom === '10' ? 'checked' : ''}
					>
						10%
						<input
							type='radio'
							value='10'
							name='tip-percent'
							id='10%'
							onChange={e => setInputCustom(e.target.value)}
							checked={inputCustom === '10'}
						/>
					</label>
					<label
						htmlFor='15%'
						className={inputCustom === '15' ? 'checked' : ''}
					>
						15%
						<input
							type='radio'
							value='15'
							name='tip-percent'
							id='15%'
							onChange={e => setInputCustom(e.target.value)}
							checked={inputCustom === '15'}
						/>
					</label>
					<label
						htmlFor='25%'
						className={inputCustom === '25' ? 'checked' : ''}
					>
						25%
						<input
							type='radio'
							value='25'
							name='tip-percent'
							id='25%'
							onChange={e => setInputCustom(e.target.value)}
							checked={inputCustom === '25'}
						/>
					</label>
					<label
						htmlFor='50%'
						className={inputCustom === '50' ? 'checked' : ''}
					>
						50%
						<input
							type='radio'
							value='50'
							name='tip-percent'
							id='50%'
							onChange={e => setInputCustom(e.target.value)}
							checked={inputCustom === '50'}
						/>
					</label>
					<input
						className='custom-input'
						type='number'
						placeholder='Custom'
						value={checkInput(inputCustom).length > 0 ? '' : inputCustom}
						maxLength='3'
						onChange={e => setInputCustom(e.target.value)}
					/>
				</div>
			</div>

			<div className='w-100'>
				<p>
					Number of People <Error input={inputPeople} />
				</p>
				<div className='input-wrapper'>
					<img src='/images/icon-person.svg' alt='dollar' />
					<input
						className='people-input'
						placeholder='0'
						type='number'
						value={inputPeople}
						onChange={e => setInputPeople(e.target.value)}
					/>
				</div>
			</div>
		</div>
	)
}

export default UserInput
