package learn.gamer.domain;

import learn.gamer.data.GamerRepository;
import learn.gamer.models.Game;
import learn.gamer.models.Gamer;

import java.time.LocalDate;
import java.time.Year;
import java.util.Calendar;
import java.util.List;

public class GamerService {

    private final GamerRepository gamerRepository;

    public GamerService(GamerRepository gamerRepository) {
        this.gamerRepository = gamerRepository;
    }

    public List<Gamer> findAll(){
        return gamerRepository.findAll();
    }

    public Gamer findByGamerTag(String gamerTag){
        return gamerRepository.findByGamerTag(gamerTag);
    }

    public Gamer findByGameTitle(String gameTitle){
        return gamerRepository.findByGameTitle(gameTitle);
    }

    public Result<Gamer> create(Gamer gamer){
        Result<Gamer> result = validate(gamer);
        if (result.getResultType() != ResultType.SUCCESS) {
            return result;
        }

        Gamer inserted = gamerRepository.create(gamer);
        if (inserted == null) {
            result.addMessage("insert failed", ResultType.INVALID);
        } else {
            result.setPayload(inserted);
        }

        return result;
    }

    public Result<Gamer> update(Gamer gamer){

        return null;
    }

    //VALIDATIONS
    //gamerTag required
    //birthDate required
    //genderType required
    //bio required
    //birthDate cannot be in the future
    //birthDate must be past a certain age
    //GamerTag length must be between 1 and 20 characters
    //bio cannot be more than 500 characters

    private Result<Gamer> validate(Gamer gamer) {

        Result<Gamer> result = new Result<>();

        if (gamer == null) {
            result.addMessage("gamer cannot be null.", ResultType.INVALID);
            return result;
        }

        if(gamer.getGamerTag() == null || gamer.getGamerTag().isBlank()){
            result.addMessage("gamerTag is required", ResultType.INVALID);
            return result;
        }

        if(gamer.getBirthDate() == null){
            result.addMessage("birthDate is required", ResultType.INVALID);
            return result;
        }

        if(gamer.getBio() == null || gamer.getBio().isBlank()){
            result.addMessage("bio is required", ResultType.INVALID);
            return result;
        }

        if(gamer.getGenderType() == null) {
            result.addMessage("genderType is required", ResultType.INVALID);
            return result;
        }

        if(gamer.getBirthDate().isAfter(LocalDate.now())){
            result.addMessage("birthDate must be in the past");
            return result;
        }

        if(gamer.getBirthDate().isAfter(LocalDate.now().minusYears(16))){
            result.addMessage("must be 16 years or older");
            return result;
        }

        if(gamer.getGamerTag().length() < 1 || gamer.getGamerTag().length() > 20){
            result.addMessage("gamerTag must be between 1 to 20 characters long");
            return result;
        }

        if(gamer.getBio().length() < 1 || gamer.getBio().length() > 500) {
            result.addMessage("bio must be between 1 to 500 characters long");
            return result;
        }

        return result;
    }
}
