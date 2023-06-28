package learn.gamer.data;

import learn.gamer.models.Game;
import learn.gamer.models.Match;
import org.apache.tomcat.jni.Local;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class MatchJdbcTemplateRepositoryTest {

    @Autowired
    private MatchJdbcTemplateRepository repository;

    @Autowired
    private KnownGoodState knownGoodState;

    static boolean hasSetup = false;

    @BeforeEach
    void setup() {
        knownGoodState.set();
    }

    @Test
    void shouldFindMatches() {
        List<Match> matches = repository.findAll();
        assertNotNull(matches);
        assertTrue(matches.size() > 0);
        assertEquals(2, matches.size());
    }

    @Test
    void shouldFindMatchesFromId2() {
//        (1, 2, 6, '2023-06-27'),
//        (2, 3, 7, '2023-06-26');
        // "matchFrom" means "these are the matches sent FROM user with id 2 (from user 2)
        List<Match> matchFrom = repository.findYouMatched(2);
        assertNotNull(matchFrom);
        assertEquals(1, matchFrom.size());
        assertEquals(6, matchFrom.get(0).getAppUserId2());
    }

    @Test
    void shouldFindMatchesForId2() {
        // "matchedTo" means "these are the matches sent TO user with id 7 (from other people)
        List<Match> matchedTo = repository.findMatchedYou(7);
        assertNotNull(matchedTo);
        assertEquals(1, matchedTo.size());
        assertEquals(3, matchedTo.get(0).getAppUserId1());
    }

    @Test
    void shouldNotFindMatchesForNonExistingId() {
        List<Match> badMatchesFrom = repository.findMatchedYou(999);
        assertEquals(0, badMatchesFrom.size());
        List<Match> badMatchesTo = repository.findYouMatched(999);
        assertEquals(0, badMatchesTo.size());
    }

    @Test
    void shouldAddNewMatch() {
        Match match = new Match();
        match.setAppUserId1(1);
        match.setAppUserId2(2);
        match.setDateMatched(LocalDate.parse("2023-01-01"));

        Match actual = repository.add(match);
        assertNotNull(actual);
        assertEquals(3, actual.getMatchId());
        assertEquals(1, actual.getAppUserId1());
        assertEquals(2, actual.getAppUserId2());
        assertEquals(LocalDate.parse("2023-01-01"), actual.getDateMatched());
    }

    @Test
    void shouldDeleteById() {
        boolean result = repository.deleteById(1);
        assertTrue(result);
    }

    @Test
    void shouldNotDeleteNonExistingId() {
        boolean result = repository.deleteById(999);
        assertFalse(result);
    }
}