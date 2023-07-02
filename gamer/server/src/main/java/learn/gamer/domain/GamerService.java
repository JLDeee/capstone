package learn.gamer.domain;

import learn.gamer.data.GamerGameRepository;
import learn.gamer.data.GamerRepository;
import learn.gamer.models.Game;
import learn.gamer.models.Gamer;
import learn.gamer.models.GamerGame;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Year;
import java.util.Calendar;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class GamerService {
    private final GamerRepository repository;
    private final GamerGameRepository gamerGameRepository;

    public GamerService(GamerRepository repository, GamerGameRepository gamerGameRepository) {
        this.repository = repository;
        this.gamerGameRepository = gamerGameRepository;
    }

    public List<Gamer> findAll(){
        return repository.findAll();
    }

    public Gamer findByGamerId(int gamerId){
        return repository.findByGamerId(gamerId);
    }

    public List<Gamer> findByGameTitle(String gameTitle){
        return repository.findByGameTitle(gameTitle);
    }

    public List<Gamer> findByGameId(int gameId) {
        return repository.findByGameId(gameId);
    }

    public Result<Gamer> create(Gamer gamer){
        Result<Gamer> result = validate(gamer);
        if (!result.isSuccess()) {
            return result;
        }

        if (gamer.getGamerId() != 0) {
            result.addMessage("Gamer ID cannot be set for an add operation.", ResultType.INVALID);
        }

        gamer = repository.create(gamer);
        result.setPayload(gamer);
        return result;
    }

    public Result<Gamer> update(Gamer gamer){
        Result<Gamer> result = validate(gamer);
        if (!result.isSuccess()) {
            return result;
        }

        if (gamer.getGamerId() <= 0) {
            result.addMessage("Gamer ID must be set for an update operation.", ResultType.INVALID);
        }

        if (!repository.update(gamer)) {
            result.addMessage(String.format("Gamer ID %s not found.", gamer.getGamerId()), ResultType.NOT_FOUND);
        }
        return result;
    }

    // methods for GamerGame
    public Result<Void> addGame(GamerGame gamerGame) {
        Result<Void> result = validate(gamerGame);
        if (!result.isSuccess()) {
            return result;
        }
        if (!gamerGameRepository.add(gamerGame)) {
            result.addMessage("Game was not added.", ResultType.INVALID);
        }
        return result;
    }

    public boolean deleteGameByKey(int gamerId, int gameId) {
        return gamerGameRepository.deleteByKey(gamerId, gameId);
    }

    private Result<Gamer> validate(Gamer gamer) {
        Result<Gamer> result = new Result<>();

        if (gamer == null) {
            result.addMessage("Gamer cannot be null.", ResultType.INVALID);
            return result;
        }

        if(gamer.getGamerTag() == null || gamer.getGamerTag().isBlank()){
            result.addMessage("Gamer tag is required.", ResultType.INVALID);
            return result;
        }

        if(gamer.getBirthDate() == null){
            result.addMessage("Birth date is required.", ResultType.INVALID);
            return result;
        }

        if(gamer.getBio() == null || gamer.getBio().isBlank()){
            result.addMessage("Bio is required.", ResultType.INVALID);
            return result;
        }

        if(gamer.getGenderType() == null) {
            result.addMessage("Gender is required.", ResultType.INVALID);
            return result;
        }

        if(gamer.getBirthDate().isAfter(LocalDate.now())){
            result.addMessage("Birth date must be in the past.", ResultType.INVALID);
            return result;
        }

        if(gamer.getBirthDate().isAfter(LocalDate.now().minusYears(16))){
            result.addMessage("Must be 16 years or older.", ResultType.INVALID);
            return result;
        }

        if(gamer.getGamerTag().length() < 1 || gamer.getGamerTag().length() > 20){
            result.addMessage("Gamer tag must be between 1 to 20 characters long.", ResultType.INVALID);
            return result;
        }

        if(gamer.getBio().length() < 1 || gamer.getBio().length() > 500) {
            result.addMessage("Bio must be between 1 to 500 characters long.", ResultType.INVALID);
            return result;
        }

        if (result.isSuccess()) {
            List<Gamer> existingGamers = repository.findAll();
            // filter out the current gamer in the case of updating
            existingGamers = existingGamers.stream()
                    .filter(g -> g.getGamerId() != gamer.getGamerId())
                    .collect(Collectors.toList());
            // check if there are other gamers. if there are, check if there's a duplicate gamer tag
            if(existingGamers.size() > 0) {
                if(existingGamers
                        .stream()
                        .anyMatch(g -> g.getGamerTag().equalsIgnoreCase(gamer.getGamerTag()))) {
                    result.addMessage("That gamer tag is already in use! Duplicate gamer tag.", ResultType.DUPLICATE);
                }
            }
        }
        return result;
    }

    private Result<Void> validate(GamerGame gamerGame) {
        Result<Void> result = new Result<>();
        if (gamerGame == null) {
            result.addMessage("gamerGame cannot be null.", ResultType.INVALID);
            return result;
        }

        if (gamerGame.getGame() == null) {
            result.addMessage("Game is required.", ResultType.INVALID);
            return result;
        }
        return result;
    }
}
