package learn.gamer.data;

import learn.gamer.models.Gamer;
import learn.gamer.models.MatchSent;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class MatchSentJdbcTemplateRepositoryTest {
    @Autowired
    private MatchSentJdbcTemplateRepository repository;

    @Autowired
    private KnownGoodState knownGoodState;

    @BeforeEach
    void setup() {
        knownGoodState.set();
    }

    @Test
    void shouldAdd() {
        MatchSent matchSent = getMatchSent();
        assertTrue(repository.add(matchSent));
    }

    @Test
    void shouldDeleteByKey() {
        assertTrue(repository.deleteByKey(2, 6));
        assertFalse(repository.deleteByKey(2, 6));
    }

    @Test
    void shouldNotDeleteByInvalidKey() {
        assertFalse(repository.deleteByKey(1, 1));
    }

    private MatchSent getMatchSent() {
        MatchSent matchSent = new MatchSent();
        matchSent.setGamerSenderId(1);
        matchSent.setDateMatchSent(LocalDate.parse("2023-01-01"));

        Gamer gamer = new Gamer();
        gamer.setGamerId(4);
        matchSent.setGamerReceiver(gamer);
        return matchSent;
    }

}