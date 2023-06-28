package learn.gamer.domain;

import learn.gamer.data.GameRepository;
import learn.gamer.data.MatchRepository;
import learn.gamer.models.Game;
import learn.gamer.models.Match;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class MatchServiceTest {

    @Autowired
    MatchService service;

    @MockBean
    MatchRepository repository;

    @Test
    void shouldFindAll() {
        when(repository.findAll()).thenReturn(List.of(
                new Match(1,1,2, LocalDate.of(2023, 06, 25)),
                new Match(2,3,4, LocalDate.of(2023, 06, 20))
        ));

        List<Match> matches = service.findAll();

        assertEquals(2, matches.size());
    }

    @Test
    void shouldNotFindMatchedYou(){
       // when(repository.findMatchedYou(1)).thenReturn(new Match());
        List<Match> matches = service.findYouMatched(1);
        assertEquals(matches.size(), 1);
    }

    @Test
    void shouldNotFindNullMatchedYou(){
        List<Match> matches = service.findYouMatched(99);
        assertEquals(matches.size(), 0);
    }

    @Test
    void shouldFindYouMatched(){

    }

    @Test
    void shouldNotFindNullYouMatched(){
        List<Match> matches = service.findMatchedYou(99);
        assertEquals(matches.size(), 0);
    }


}