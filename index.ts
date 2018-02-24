class Hooman{
    name: string;
    id: number;

    constructor(name: string, id: number){
        this.name = name;
        this.id = id;
    }
}

const enum MedicalSpec{
    General,Surgen
}

class Doctor extends Hooman{
    specialization: MedicalSpec;
    examinations: Examination[];



    constructor(name: string, id: number, specialization: MedicalSpec){
        super(name,id);
        this.specialization = specialization;
        this.examinations = [];
    }

    makeAppointment(patient:Hooman, date: Date){
        const exam = new Examination(patient, this , date);
        this.examinations.push(exam);
    }

    examine(examination: Examination){
        examination.finished = true;
    }

    examineForADay(){
        const now = new Date();
        for(let i = 0;i < this.examinations.length; i++){
            const exam = this.examinations[i];
            if(exam.date.getDate() == now.getDate() && exam.date.getMonth() == now.getMonth() && exam.date.getFullYear() == now.getFullYear()){
                this.examine(exam);
            }
        }
    }
}

class Examination {
    patient: Hooman;
    doctor: Doctor;
    date: Date;
    finished: boolean;

    constructor(patient: Hooman, doctor: Doctor, date: Date){
        this.patient = patient;
        this.doctor = doctor;
        this.date = date;
        this.finished = false;
    }
}


const doc = new Doctor("Pete", -1, MedicalSpec.Surgen);
const human = new Hooman("Ivan", 1);
doc.makeAppointment(human, new Date("2000-1-1"));
doc.makeAppointment(human, new Date("2000-1-7"));
doc.makeAppointment(human, new Date("2000-1-30"));
doc.makeAppointment(human, new Date("2018-2-24"));
doc.makeAppointment(human, new Date("2000-8-1"));
doc.makeAppointment(human, new Date("2018-2-24"));
doc.examineForADay();
let sum = 0;
for(const exam of doc.examinations) {
    if(exam.finished){
        sum += 1;
    }
}
console.log(sum);