package learn.gamer.domain;

import learn.gamer.data.MatchRepository;
import learn.gamer.models.Game;
import learn.gamer.models.Match;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class MatchService {

    private final MatchRepository matchRepository;

    public MatchService(MatchRepository matchRepository) {
        this.matchRepository = matchRepository;
    }

    public List<Match> findAll(){
        return matchRepository.findAll();
    }

    public List<Match> findYouMatched(int gamerId1){
        return matchRepository.findYouMatched(gamerId1);
    }

    public List<Match> findMatchedYou(int gamerId2){
        return matchRepository.findMatchedYou(gamerId2);
    }

    public Result<Match> add(Match match){
        Result<Match> result = validate(match);
        if (result.getResultType() != ResultType.SUCCESS) {
            return result;
        }

        Match inserted = matchRepository.add(match);
        if (inserted == null) {
            result.addMessage("insert failed", ResultType.INVALID);
        } else {
            result.setPayload(inserted);
        }

        return result;
    }

    public Result<Match> deleteById(int matchId){
        Result<Match> result = new Result<Match>();
        if (!matchRepository.deleteById(matchId)) {
            result.addMessage("Match id " + matchId + " was not found.", ResultType.NOT_FOUND);
        }
        return result;
    }

    //VALIDATIONS
    //check if null
    //Check if Id is same
    //check that match date is in the past
    private Result<Match> validate (Match match) {

        Result<Match> result = new Result<>();

        if (match == null) {
            result.addMessage("Match must exist.", ResultType.INVALID);
            return result;
        }

        if(match.getDateMatched().isAfter(LocalDate.now())) {
            result.addMessage("Match must be in the past.", ResultType.INVALID);
        }
        return result;
    }
}
