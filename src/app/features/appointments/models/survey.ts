export class Question {
	question:string = ''
	answer:string = ''
}

export class Survey {
	appointmentId:string = ''
	patientId:string = ''
	specialistId:string = ''
	questions:Question[] = []
}
